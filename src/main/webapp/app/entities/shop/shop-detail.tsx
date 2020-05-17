import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './shop.reducer';
import { IShop } from 'app/shared/model/shop.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShopDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ShopDetail = (props: IShopDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { shopEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Shop [<b>{shopEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="shopName">Shop Name</span>
          </dt>
          <dd>{shopEntity.shopName}</dd>
          <dt>User</dt>
          <dd>{shopEntity.user ? shopEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/shop" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/shop/${shopEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ shop }: IRootState) => ({
  shopEntity: shop.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetail);
