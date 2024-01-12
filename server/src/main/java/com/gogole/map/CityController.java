package com.gogole.map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class CityController {

	private final CityService cityService;


	public CityController(CityService cityService) {
		this.cityService = cityService;
	}

	@RequestMapping("/api/cities")
	public List<City> getAllCities() {
		return cityService.getAllCities();
	}

	@GetMapping("/{name}")
	public City getCityByName(@PathVariable String name) {
		return cityService.getCityByName(name);
	}


	@PostMapping
	public ResponseEntity<City> createCity(@RequestBody City city) {
		City createdCity = cityService.createCity(city);
		return new ResponseEntity<>(createdCity, HttpStatus.CREATED);
	}

	@PutMapping("/{name}")
	public ResponseEntity<City> updateCity(@PathVariable String name, @RequestBody City updatedCity) {
		City city = cityService.updateCity(name, updatedCity);
		if (city != null) {
			return new ResponseEntity<>(city, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{name}")
	public ResponseEntity<Void> deleteCity(@PathVariable String name) {
		if (cityService.deleteCity(name)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}