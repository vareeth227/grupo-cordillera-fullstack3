package com.grupocordillera.gateway.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controlador de fallback del API Gateway.
 * Cuando un microservicio no responde y el Circuit Breaker se abre,
 * estas respuestas son devueltas al cliente en lugar de un error de timeout.
 */
@RestController
@RequestMapping("/fallback")
public class FallbackController {

    /** Respuesta de fallback cuando ms-ventas no está disponible */
    @GetMapping("/ventas")
    public ResponseEntity<Map<String, String>> fallbackVentas() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "mensaje", "El servicio de Ventas no está disponible temporalmente.",
                        "servicio", "ms-ventas",
                        "estado", "CIRCUIT_BREAKER_OPEN"
                ));
    }

    /** Respuesta de fallback cuando ms-ecommerce no está disponible */
    @GetMapping("/ecommerce")
    public ResponseEntity<Map<String, String>> fallbackEcommerce() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "mensaje", "El servicio de Ecommerce no está disponible temporalmente.",
                        "servicio", "ms-ecommerce",
                        "estado", "CIRCUIT_BREAKER_OPEN"
                ));
    }

    /** Respuesta de fallback cuando ms-inventario no está disponible */
    @GetMapping("/inventario")
    public ResponseEntity<Map<String, String>> fallbackInventario() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "mensaje", "El servicio de Inventario no está disponible temporalmente.",
                        "servicio", "ms-inventario",
                        "estado", "CIRCUIT_BREAKER_OPEN"
                ));
    }

    /** Respuesta de fallback cuando ms-financiero no está disponible */
    @GetMapping("/financiero")
    public ResponseEntity<Map<String, String>> fallbackFinanciero() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "mensaje", "El servicio Financiero no está disponible temporalmente.",
                        "servicio", "ms-financiero",
                        "estado", "CIRCUIT_BREAKER_OPEN"
                ));
    }

    /** Respuesta de fallback cuando ms-clientes no está disponible */
    @GetMapping("/clientes")
    public ResponseEntity<Map<String, String>> fallbackClientes() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of(
                        "mensaje", "El servicio de Clientes no está disponible temporalmente.",
                        "servicio", "ms-clientes",
                        "estado", "CIRCUIT_BREAKER_OPEN"
                ));
    }
}
