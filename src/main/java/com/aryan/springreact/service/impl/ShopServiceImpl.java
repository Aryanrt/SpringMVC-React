package com.aryan.springreact.service.impl;

import com.aryan.springreact.service.ShopService;
import com.aryan.springreact.domain.Shop;
import com.aryan.springreact.repository.ShopRepository;
import com.aryan.springreact.repository.search.ShopSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Shop}.
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService {

    private final Logger log = LoggerFactory.getLogger(ShopServiceImpl.class);

    private final ShopRepository shopRepository;

    private final ShopSearchRepository shopSearchRepository;

    public ShopServiceImpl(ShopRepository shopRepository, ShopSearchRepository shopSearchRepository) {
        this.shopRepository = shopRepository;
        this.shopSearchRepository = shopSearchRepository;
    }

    /**
     * Save a shop.
     *
     * @param shop the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Shop save(Shop shop) {
        log.debug("Request to save Shop : {}", shop);
        Shop result = shopRepository.save(shop);
        shopSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the shops.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shop> findAll() {
        log.debug("Request to get all Shops");
        return shopRepository.findAll();
    }

    /**
     * Get one shop by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Shop> findOne(Long id) {
        log.debug("Request to get Shop : {}", id);
        return shopRepository.findById(id);
    }

    /**
     * Delete the shop by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shop : {}", id);
        shopRepository.deleteById(id);
        shopSearchRepository.deleteById(id);
    }

    /**
     * Search for the shop corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shop> search(String query) {
        log.debug("Request to search Shops for query {}", query);
        return StreamSupport
            .stream(shopSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
