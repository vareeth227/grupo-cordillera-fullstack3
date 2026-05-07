package com.grupocordillera.ecommerce.service;

import com.grupocordillera.ecommerce.dto.PedidoDTO;
import com.grupocordillera.ecommerce.entity.ItemPedido;
import com.grupocordillera.ecommerce.entity.Pedido;
import com.grupocordillera.ecommerce.factory.PedidoFactory;
import com.grupocordillera.ecommerce.repository.ItemPedidoRepository;
import com.grupocordillera.ecommerce.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de Ecommerce.
 * Gestiona el ciclo de vida de los pedidos online.
 */
@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final PedidoFactory pedidoFactory;

    @Override
    @Transactional(readOnly = true)
    public List<PedidoDTO> listarPedidos() {
        return pedidoRepository.findAll().stream()
                .map(p -> pedidoFactory.toDTO(p, itemPedidoRepository.findByPedidoId(p.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoDTO> listarPedidosPorCliente(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream()
                .map(p -> pedidoFactory.toDTO(p, itemPedidoRepository.findByPedidoId(p.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoDTO> listarPedidosPorEstado(String estado) {
        return pedidoRepository.findByEstado(estado).stream()
                .map(p -> pedidoFactory.toDTO(p, itemPedidoRepository.findByPedidoId(p.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoDTO obtenerPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + id));
        List<ItemPedido> items = itemPedidoRepository.findByPedidoId(id);
        return pedidoFactory.toDTO(pedido, items);
    }

    /** Crea el pedido y persiste sus ítems en una sola transacción */
    @Override
    @Transactional
    public PedidoDTO crearPedido(PedidoDTO dto) {
        Pedido pedido = pedidoFactory.crearPedido(dto);
        Pedido guardado = pedidoRepository.save(pedido);

        // Persistir cada ítem asociado al pedido guardado
        List<ItemPedido> items = dto.getItems().stream()
                .map(itemDTO -> pedidoFactory.crearItem(itemDTO, guardado.getId()))
                .map(itemPedidoRepository::save)
                .collect(Collectors.toList());

        return pedidoFactory.toDTO(guardado, items);
    }

    /** Cambia el estado del pedido (e.g. PENDIENTE -> CONFIRMADO -> EN_ENVIO) */
    @Override
    @Transactional
    public PedidoDTO actualizarEstado(Long id, String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con ID: " + id));
        pedido.setEstado(nuevoEstado);
        Pedido actualizado = pedidoRepository.save(pedido);
        return pedidoFactory.toDTO(actualizado, itemPedidoRepository.findByPedidoId(id));
    }
}
