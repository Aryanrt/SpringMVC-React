package com.aryan.springreact.service;

import com.aryan.springreact.domain.Shop;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Shop}.
 */
public interface ShopService {

    /**
     * Save a shop.
     *
     * @param shop the entity to save.
     * @return the persisted entity.
     */
    Shop save(Shop shop);

    /**
     * Get all the shops.
     *
     * @return the list of entities.
     */
    List<Shop> findAll();

    /**
     * Get the "id" shop.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Shop> findOne(Long id);

    /**
     * Delete the "id" shop.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the shop corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<Shop> search(String query);
}
