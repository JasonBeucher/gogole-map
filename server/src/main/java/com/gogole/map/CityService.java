package com.gogole.map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class CityService {

	private final String jsonFilePath = "assets/fr.json";
	private List<City> cities;

	public CityService() {
		try {
			this.cities = loadCitiesFromJsonFile();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public List<City> getAllCities() {
		return cities;
	}

	public City getCityByName(String name) {
		// Recherchez la ville par son nom dans la liste
		return cities.stream()
				.filter(city -> city.getName().equalsIgnoreCase(name))
				.findFirst()
				.orElse(null); // Retournez null si la ville n'est pas trouvée
	}

	public City createCity(City city){
		cities.add(city);
		saveCitiesToJson();
		return city;
	}


	private void saveCitiesToJson() {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectWriter objectWriter = objectMapper.writerWithDefaultPrettyPrinter();

		try {
			objectWriter.writeValue(new File(jsonFilePath), cities);
		} catch (IOException e) {
			e.printStackTrace(); // Gérez l'exception de manière appropriée dans une application réelle
		}
	}

	private List<City> loadCitiesFromJsonFile() throws IOException {
		try {
			File file = new File(jsonFilePath);

			// Si le fichier n'existe pas, retournez une liste vide
			if (!file.exists()) {
				return List.of();
			}

			ObjectMapper objectMapper = new ObjectMapper();
			return objectMapper.readValue(file, new TypeReference<List<City>>() {});
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	public City updateCity(String name, City updatedCity) {
		for (City city : cities) {
			if (city.getName().equalsIgnoreCase(name)) {
				// Mettez à jour les attributs de la ville existante avec les nouvelles valeurs
				city.setLatitude(updatedCity.getLatitude());
				city.setLongitude(updatedCity.getLongitude());
				city.setRegion(updatedCity.getRegion());
				city.setPopulation(updatedCity.getPopulation());
				saveCitiesToJson();
				return city;
			}
		}
		return null; // Retournez null si la ville n'est pas trouvée
	}

	public boolean deleteCity(String name) {
		City cityToRemove = null;
		for (City city : cities) {
			if (city.getName().equalsIgnoreCase(name)) {
				cityToRemove = city;
				break;
			}
		}
		if (cityToRemove != null) {
			cities.remove(cityToRemove);
			saveCitiesToJson();
			return true; // Retournez true si la ville est supprimée avec succès
		} else {
			return false; // Retournez false si la ville n'est pas trouvée
		}
	}
}
