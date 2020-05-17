package com.aryan.springreact.repository.search;

import com.aryan.springreact.domain.Shop;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Shop} entity.
 */
public interface ShopSearchRepository extends ElasticsearchRepository<Shop, Long> {
}
