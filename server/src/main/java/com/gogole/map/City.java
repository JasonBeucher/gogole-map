package com.gogole.map;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Setter;


@Data
public class City {
	private String name;
	private double latitude;
	private double longitude;
	private String region;
	private int population;
	@Setter
	private double distance;

	@JsonCreator
	public City(
			@JsonProperty("name") String name,
			@JsonProperty("latitude") double latitude,
			@JsonProperty("longitude") double longitude,
			@JsonProperty("region") String region,
			@JsonProperty("population") int population) {
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.region = region;
		this.population = population;
	}

	public String getName(){
		return this.name;
	}
	public double getLatitude() {
		return latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public String getRegion() {
		return region;
	}

	public int getPopulation() {
		return population;
	}

	public double getDistance() { return this.distance; }

}
