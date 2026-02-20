import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

export const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

const API_URL = 'http://192.168.0.14:3000/api';

// const API_URL = Platform.OS === 'ios' ? 'http://192.168.0.9:3000/api' : 'http://10.0.2.2:3000/api';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/products`);

                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.message);
                };

                setProducts(data);
            } catch(err){
                console.log(err);
            }
        };

        getProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};