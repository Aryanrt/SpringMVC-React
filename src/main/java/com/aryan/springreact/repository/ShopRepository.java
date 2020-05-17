package com.aryan.springreact.repository;

import com.aryan.springreact.domain.Shop;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Shop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    @Query("select shop from Shop shop where shop.user.login = ?#{principal.username}")
    List<Shop> findByUserIsCurrentUser();
}
