import { motion } from "framer-motion"
import { useAdminStore } from "../store/AdminStore"
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Loader2Icon } from "lucide-react";
import Product from "./Product";

export default function ProductsView() {
  const { isLoading, getProducts, products, deleteProduct, featureProduct  } = useAdminStore();

  useEffect(()=>{
    getProducts()
  }, [ getProducts ])

  if(isLoading){
    return <div>
        <Loader2Icon className="animate-spin" />
    </div>
  }

  return (
    <motion.div
    initial={{ opacity:0.5, x:10 }}
    animate={{ opacity:1, x:0 }}
    transition={{ duration:0.7, ease:"linear" }}
    >
        <div className="flex flex-col items-center">
            <div>
                <h1 className="text-2xl font-bold text-primary">YOUR PRODUCTS</h1>
            </div>
            <div>
                {
                    products.map(pr => {
                        return <Product 
                        key={pr._id}
                        product={pr}
                        deleteFunc={deleteProduct}
                        featureFunc={featureProduct}
                        />
                    })
                }
            </div>
        </div>
    </motion.div>
  )
}
