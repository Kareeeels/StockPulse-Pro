const API_URL = 'http://194.163.180.138:8081/api';

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

function checkAuth() {
    const user = localStorage.getItem('user');
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html')) {
        if (!user) {
            window.location.href = 'login.html';
        } else {
            loadStocks();
        }
    } else if ((currentPage.includes('login.html') || currentPage.includes('register.html')) && user) {
        window.location.href = 'index.html';
    }
}

function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const stockForm = document.getElementById('stockForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    if (stockForm) stockForm.addEventListener('submit', handleStockSubmit);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (cancelBtn) cancelBtn.addEventListener('click', resetForm);
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const user = await response.json();
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        alert('Error al iniciar sesión');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        alert('Registro exitoso! Ahora inicia sesión');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error al registrarse');
    }
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

async function loadStocks() {
    try {
        const response = await fetch(`${API_URL}/stocks`);
        const stocks = await response.json();
        displayStocks(stocks);
    } catch (error) {
        alert('Error al cargar las acciones');
    }
}

function displayStocks(stocks) {
    const table = document.getElementById('stocksTable');
    table.innerHTML = stocks.map(stock => `
        <tr>
            <td>${stock.nombreEmpresa}</td>
            <td>${stock.simbolo}</td>
            <td>${stock.sector}</td>
            <td>$${stock.precioActual.toFixed(2)}</td>
            <td>${stock.mercado}</td>
            <td class="actions">
                <button onclick="editStock(${stock.id})">Editar</button>
                <button class="btn-danger" onclick="deleteStock(${stock.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

async function handleStockSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('stockId').value;
    const stock = {
        nombreEmpresa: document.getElementById('nombreEmpresa').value,
        simbolo: document.getElementById('simbolo').value,
        sector: document.getElementById('sector').value,
        precioActual: parseFloat(document.getElementById('precioActual').value),
        mercado: document.getElementById('mercado').value
    };

    try {
        if (id) {
            await fetch(`${API_URL}/stocks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stock)
            });
        } else {
            await fetch(`${API_URL}/stocks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stock)
            });
        }
        resetForm();
        loadStocks();
    } catch (error) {
        alert('Error al guardar la acción');
    }
}

async function editStock(id) {
    try {
        const response = await fetch(`${API_URL}/stocks/${id}`);
        const stock = await response.json();

        document.getElementById('stockId').value = stock.id;
        document.getElementById('nombreEmpresa').value = stock.nombreEmpresa;
        document.getElementById('simbolo').value = stock.simbolo;
        document.getElementById('sector').value = stock.sector;
        document.getElementById('precioActual').value = stock.precioActual;
        document.getElementById('mercado').value = stock.mercado;

        document.getElementById('formTitle').textContent = 'Editar Acción';
        document.getElementById('submitBtn').textContent = 'Actualizar';
        document.getElementById('cancelBtn').classList.remove('hidden');
    } catch (error) {
        alert('Error al cargar la acción');
    }
}

async function deleteStock(id) {
    if (confirm('¿Estás seguro de eliminar esta acción?')) {
        try {
            await fetch(`${API_URL}/stocks/${id}`, { method: 'DELETE' });
            loadStocks();
        } catch (error) {
            alert('Error al eliminar la acción');
        }
    }
}

function resetForm() {
    document.getElementById('stockForm').reset();
    document.getElementById('stockId').value = '';
    document.getElementById('formTitle').textContent = 'Agregar Acción';
    document.getElementById('submitBtn').textContent = 'Agregar';
    document.getElementById('cancelBtn').classList.add('hidden');
}
