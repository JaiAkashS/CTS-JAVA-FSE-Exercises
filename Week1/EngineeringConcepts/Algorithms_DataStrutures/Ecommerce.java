import java.util.Arrays;
import java.util.Comparator;

public class Ecommerce {

    static class Product {
        int productId;
        String productName;
        String category;

        public Product(int productId, String productName, String category) {
            this.productId = productId;
            this.productName = productName;
            this.category = category;
        }

        @Override
        public String toString() {
            return productId + " - " + productName + " (" + category + ")";
        }
    }

    public static Product linearSearch(Product[] products, int targetId) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productId == targetId) {
                return products[i];
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] products, int targetId) {
        int left = 0, right = products.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            if (products[mid].productId == targetId) {
                return products[mid];
            } else if (products[mid].productId < targetId) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    public static void main(String[] args) {

        Product[] products = {
            new Product(105, "Shoes", "Fashion"),
            new Product(101, "Laptop", "Electronics"),
            new Product(110, "Watch", "Accessories"),
            new Product(102, "Phone", "Electronics"),
            new Product(108, "Bag", "Fashion")
        };

        int targetId = 102;

        Product result1 = linearSearch(products, targetId);
        System.out.println("Linear Search Result: " + result1);

        Arrays.sort(products, Comparator.comparingInt(p -> p.productId));

        Product result2 = binarySearch(products, targetId);
        System.out.println("Binary Search Result: " + result2);
    }
}
