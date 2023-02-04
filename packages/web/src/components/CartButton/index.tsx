import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../icons/CartIcon";
import { LifestyleCartContext } from "../../contexts/LifestyleCartContext";
import "./index.scss";
import { Badge as AntBadge } from "antd";

const CartButton: FC<{}> = () => {
	const { quantityInCart } = useContext(LifestyleCartContext);

	return (
		<Link to="/rewards-cart" className="cart-button">
			<AntBadge count={quantityInCart}>
				<CartIcon color="#003087" />
			</AntBadge>
		</Link>
	);
};

export default CartButton;
