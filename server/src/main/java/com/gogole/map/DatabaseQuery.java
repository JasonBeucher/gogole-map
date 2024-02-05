package com.gogole.map;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DatabaseQuery {

	private String url;
	private String username;
	private String password;

	private Connection connection;

	public DatabaseQuery(String url, String username, String password) {
		this.url = url;
		this.username = username;
		this.password = password;
		try {
			// Charger le pilote JDBC
			Class.forName("com.mysql.cj.jdbc.Driver");

			// Établir la connexion à la base de données

			connection = DriverManager.getConnection(url, username, password);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

	public void closeConnection() {
		try {
			if (connection != null && !connection.isClosed()) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public ResultSet executeQuery(String query, Object... parameters) {
		ResultSet resultSet = null;
		try {
			// Préparer la requête SQL
			PreparedStatement preparedStatement = connection.prepareStatement(query);

			// Injecter les paramètres dans la requête
			for (int i = 0; i < parameters.length; i++) {
				preparedStatement.setObject(i + 1, parameters[i]);
			}

			// Exécuter la requête
			resultSet = preparedStatement.executeQuery();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return resultSet;
	}

	public List<City> getCities() {
		// Exemple d'utilisation


		DatabaseQuery databaseQuery = new DatabaseQuery(url, username, password);

		// Exemple de requête SELECT
		String selectQuery = "SELECT * FROM City";
		ResultSet resultSet = databaseQuery.executeQuery(selectQuery);

		List<City> cities = new ArrayList<City>();

		// Traiter le résultat
		try {
			while (resultSet.next()) {
				// Récupérer les colonnes nécessaires
				String name = resultSet.getString("name");
				double latitude = resultSet.getDouble("latitude");
				double longitude = resultSet.getDouble("longitude");
				String region = resultSet.getString("region");
				int population = resultSet.getInt("population");

				cities.add(new City(name, latitude, longitude, region, population));
				// Faire quelque chose avec les données récupérées
				//System.out.println("Name: " + name + ", Latitude: " + latitude + ", Longitude: " + longitude +
				//		", Region: " + region + ", Population: " + population);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			// Fermer la connexion
			databaseQuery.closeConnection();
		}


		return cities;
	}
}
