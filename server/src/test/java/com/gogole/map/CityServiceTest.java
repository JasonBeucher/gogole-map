package com.gogole.map;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
class CityServiceTest {

	@Mock
	private List<City> mockCities;

	@InjectMocks
	private CityService cityService;

	@Test
	void testGetNearestCities() {

		// Configuration du mockCities
		List<City> mockCities = new ArrayList<>();
		mockCities.add(new City("Paris", 48.8566, 2.3522, "Île-de-France", 2148271));
		mockCities.add(new City("Lyon", 45.76, 4.84, "Auvergne-Rhône-Alpes", 518635));
		mockCities.add(new City("Marseille", 43.2964, 5.37, "Provence-Alpes-Côte d’Azur", 868277));

		// Injecter le mockCities dans le service
		cityService.setCities(mockCities);

		// Appel de la méthode à tester
		List<City> nearestCities = cityService.getNearestCities(48.8566, 2.3522, 2, 50);

		// Vérification des résultats
		// test parametre nb
		assertEquals(2, nearestCities.size());

		// Assurez-vous que les villes sont dans l'ordre attendu (tri par distance, par exemple)
		// test latitude et longitude
		assertEquals("Paris", nearestCities.get(0).getName());
		assertEquals("Lyon", nearestCities.get(1).getName());

		nearestCities = cityService.getNearestCities(48.8566, 2.3522, 3, 1);

		//test radius
		assertEquals("Paris", nearestCities.get(0).getName());
		assertEquals(1, nearestCities.size());

	}

	@Test
	void testCalculateDistance() {
		// Appel de la méthode à tester
		//double distance = cityService.calculateDistance(48.8566, 2.3522, 45.76, 4.84);

		// Vérification du résultat
		// Assurez-vous que la distance est calculée correctement
		//assertEquals(392.49, distance, 0.01); // Vérifiez avec une précision de 0.01
	}
}
