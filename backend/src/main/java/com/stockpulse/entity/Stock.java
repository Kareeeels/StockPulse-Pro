package com.stockpulse.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stocks")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreEmpresa;
    private String simbolo;
    private String sector;
    private double precioActual;
    private String mercado;

    public Stock() {}

    public Stock(String nombreEmpresa, String simbolo, String sector, double precioActual, String mercado) {
        this.nombreEmpresa = nombreEmpresa;
        this.simbolo = simbolo;
        this.sector = sector;
        this.precioActual = precioActual;
        this.mercado = mercado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombreEmpresa() { return nombreEmpresa; }
    public void setNombreEmpresa(String nombreEmpresa) { this.nombreEmpresa = nombreEmpresa; }
    public String getSimbolo() { return simbolo; }
    public void setSimbolo(String simbolo) { this.simbolo = simbolo; }
    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }
    public double getPrecioActual() { return precioActual; }
    public void setPrecioActual(double precioActual) { this.precioActual = precioActual; }
    public String getMercado() { return mercado; }
    public void setMercado(String mercado) { this.mercado = mercado; }
}
