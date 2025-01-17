import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View,} from 'react-native';
import {Text, withTheme} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {clearCart} from '../../../redux/actions';
import {appStyles} from '../../../styles/styles';
import {alertWithTwoButtons} from '../../../utils/alerts';
import ProductCard from '../product/list/component/ProductCard';
import EmptyComponent from './EmptyComponent';
import Footer from './Footer';

/**
 * Component to render list of items added in cart
 * @param navigation: required: to navigate to the respective screen
 * @param theme:application theme
 * @constructor
 * @returns {JSX.Element}
 */
const Cart = ({navigation, theme}) => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

  const {colors} = theme;

  const {cartItems} = useSelector(({cartReducer}) => cartReducer);

  const subTotal = cartItems.reduce((total, item) => {
    total += item.price.value * item.quantity;
    return total;
  }, 0);

  const emptyCart = () => dispatch(clearCart());

  /**
   * function handles click event of clear cart button
   * which clears the cart list
   */
  const onClearCart = () => {
    alertWithTwoButtons(
      null,
      t('main.cart.clear_cart_message'),
      t('main.product.ok_label'),
      emptyCart,
      t('main.product.cancel_label'),
      () => {},
    );
  };

  /**
   * function handles click event of checkout button
   */
  const onCheckout = () => navigation.navigate('AddressPicker');

  /**
   * Function is used to render single product card in the list
   * @param item:single object from cart list
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => <ProductCard item={item} navigation={navigation}/>;

  return (
    <SafeAreaView
      style={[appStyles.container, {backgroundColor: colors.backgroundColor}]}>
      <View
        style={[
          appStyles.container,
          styles.container,
          {backgroundColor: colors.backgroundColor},
        ]}>
        {cartItems.length !== 0 && (
          <View style={[styles.header, {backgroundColor: colors.white}]}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {t('main.cart.sub_total_label')}
              </Text>
              <Text style={styles.price}>
                ₹{Number.isInteger(subTotal) ? subTotal : parseFloat(subTotal).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, {borderColor: colors.accentColor}]}
              onPress={onClearCart}>
              <Text style={{color: colors.accentColor}}>CLEAR CART</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return <EmptyComponent navigation={navigation}/>;
          }}
          contentContainerStyle={
            cartItems.length === 0
              ? appStyles.container
              : styles.contentContainerStyle
          }
        />
        {cartItems.length !== 0 && <Footer onCheckout={onCheckout}/>}
      </View>
    </SafeAreaView>
  );
};

export default withTheme(Cart);

const styles = StyleSheet.create({
  container: {paddingBottom: 10},
  text: {fontSize: 20},
  clearCartButton: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    alignSelf: 'center',
  },
  contentContainerStyle: {paddingBottom: 10},
  row: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    elevation: 1,
  },
  button: {
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  price: {fontWeight: '700', fontSize: 20, marginLeft: 8},
});
