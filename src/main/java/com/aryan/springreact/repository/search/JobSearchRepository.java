package com.aryan.springreact.repository.search;

import com.aryan.springreact.domain.Job;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Job} entity.
 */
public interface JobSearchRepository extends ElasticsearchRepository<Job, Long> {
}
