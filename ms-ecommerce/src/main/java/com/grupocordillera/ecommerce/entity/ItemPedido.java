package com.grupocordillera.ecommerce.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Entidad que representa un ítem dentro de un pedido.
 * Cada ítem corresponde a un producto con su cantidad y precio al momento de la compra.
 */
@Entity
@Table(name = "items_pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Referencia al pedido al que pertenece este ítem */
    @Column(name = "pedido_id", nullable = false)
    private Long pedidoId;

    /** Código del producto (referencia al ms-inventario) */
    @Column(name = "producto_codigo", nullable = false, length = 50)
    private String productoCodigo;

    /** Nombre del producto al momento de la compra */
    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    /** Cantidad de unidades del producto */
    @Column(nullable = false)
    private Integer cantidad;

    /** Precio unitario al momento de la compra */
    @Column(name = "precio_unitario", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;
}
