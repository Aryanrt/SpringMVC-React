package com.aryan.springreact.repository.search;

import com.aryan.springreact.domain.Region;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Region} entity.
 */
public interface RegionSearchRepository extends ElasticsearchRepository<Region, Long> {
}
