package com.stockpulse.service;

import com.stockpulse.entity.Stock;
import com.stockpulse.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock stockDetails) {
        Stock stock = stockRepository.findById(id).orElse(null);
        if (stock != null) {
            stock.setNombreEmpresa(stockDetails.getNombreEmpresa());
            stock.setSimbolo(stockDetails.getSimbolo());
            stock.setSector(stockDetails.getSector());
            stock.setPrecioActual(stockDetails.getPrecioActual());
            stock.setMercado(stockDetails.getMercado());
            return stockRepository.save(stock);
        }
        return null;
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
