import React, { memo } from 'react';
import { Product } from 'stores/products';
import { css } from 'astroturf';
import cart from 'stores/cart';
import { useProperty } from 'hooks/useProperty';
import { Button } from './button';
import { Amount } from './amount';

/**
 * Карточка товара
 */
export const ProductCard = memo<{ product: Product }>(({ product }) => {
  const [inCart] = useProperty(
    cart.pCart.map(([current]) => !!current.items.find(({ id }) => id === product.id)).skipDuplicates(),
    false
  );

  return (
    <div className={styles.card}>
      <img className={styles.logo} src={product.picture} alt={product.name} height={150} />

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>

        <Amount amount={product.price} extraClass={styles.price} />

        {!inCart ? (
          <Button onClick={() => cart.addToCart(product.id)}>Добавить в корзину</Button>
        ) : (
          <>
            <Button buttonStyle="null" onClick={() => cart.removeFromCart(product.id)}>
              Удалить из корзины
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

const styles = css`
  .card {
    display: flex;
    flex-direction: column;

    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .logo {
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .title {
    margin: 8px 0 8px;

    color: #414554;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0241em;
  }

  .price {
    margin-bottom: 16px;
  }
`;
