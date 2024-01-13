package com.gogole.map;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CityController.class)
public class CityControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private CityService cityService;

	private List<City> sampleCities;

	@BeforeEach
	void setUp() {
		// Initialisez des données de test
		sampleCities = Arrays.asList(
				new City("Paris", 48.8566, 2.3522, "Île-de-France", 2148271),
				new City("Lyon", 45.76, 4.84, "Auvergne-Rhône-Alpes", 518635),
				new City("Marseille", 43.2964, 5.37, "Provence-Alpes-Côte d’Azur", 868277)
		);
	}

	@Test
	void getNearestCities_shouldReturnListOfCities() throws Exception {
		// Configurez le comportement du service
		when(cityService.getNearestCities(48.8566, 2.3522, 5, 10)).thenReturn(sampleCities);

		// Exécutez la requête et vérifiez la réponse
		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "48.8566")
						.param("longitude", "2.3522")
						.param("nb", "5")
						.param("radius", "10"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].name").value("Paris"))
				.andExpect(jsonPath("$[1].name").value("Lyon"))
				.andExpect(jsonPath("$[2].name").value("Marseille"));

		//test d'erreur
		when(cityService.getNearestCities(-500, -500, 5, 10)).thenReturn(Collections.emptyList());

		// Exécutez la requête et vérifiez la réponse
		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "-500")
						.param("longitude", "-500")
						.param("nb", "5")
						.param("radius", "10"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$").isArray())
				.andExpect(jsonPath("$").isEmpty());

	}

	@ParameterizedTest
	@CsvSource({
			"48.8566, 2.3522, 5, 10",  // Test avec des coordonnées valides
			"0, 0, 5, 10",             // Test avec des coordonnées au centre (0, 0)
			"-90, 180, 5, 10",         // Test avec des coordonnées à l'extrême sud et est
	})
	void getNearestCities_shouldReturnCorrectResults(double latitude, double longitude, int nb, int radius) throws Exception {
		// Configurez le comportement simulé du service pour retourner une liste vide ou une liste de villes simulée
		// en fonction des paramètres spécifiés.

		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", String.valueOf(latitude))
						.param("longitude", String.valueOf(longitude))
						.param("nb", String.valueOf(nb))
						.param("radius", String.valueOf(radius)))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				// Ajoutez des assertions pour vérifier le contenu de la réponse en fonction des résultats attendus
				// par exemple, avec jsonPath.
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	public void testInvalidRequestWithBadValues() throws Exception {
		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "48.8566")
						.param("longitude", "2.3522")
						.param("nb", "5")
						.param("radius", "a"))
				.andExpect(status().isBadRequest());

		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "a")
						.param("longitude", "2.3522")
						.param("nb", "5")
						.param("radius", "10"))
				.andExpect(status().isBadRequest());

		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "48.8566")
						.param("longitude", "a")
						.param("nb", "5")
						.param("radius", "10"))
				.andExpect(status().isBadRequest());

		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "48.8566")
						.param("longitude", "2.3522")
						.param("nb", "a")
						.param("radius", "10"))
				.andExpect(status().isBadRequest());

		mockMvc.perform(get("/api/cities/nearest")
						.param("latitude", "48.8566")
						.param("longitude", "2.3522")
						.param("nb", "5")
						.param("radius", "a"))
				.andExpect(status().isBadRequest());
	}


}
