package com.grupocordillera.msventas;

import com.grupocordillera.ventas.VentasApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = VentasApplication.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class MsVentasApplicationTests {

    @Test
    void contextLoads() {
        assertTrue(true);
    }
}
