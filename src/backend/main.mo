import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";

actor {
  type Category = {
    #highlights;
    #vegetarian;
    #meat;
    #seafood;
    #specialty;
    #dessert;
  };

  type MenuItem = {
    name : Text;
    description : Text;
    price : Nat;
    category : Category;
    imageURL : Text;
  };

  let menuItems = Map.empty<Text, MenuItem>();

  let restaurantInfo : Text = "123 Pizza Lane, Anytown. Open Mon-Sun 11am-10pm. Call 555-1234.";

  func initializeMenu() {
    menuItems.add(
      "margherita",
      {
        name = "Margherita";
        description = "Classic tomato, mozzarella, and basil";
        price = 1190;
        category = #vegetarian;
        imageURL = "https://img.pizza.com/margherita.jpg";
      },
    );
    menuItems.add(
      "pepperoni",
      {
        name = "Pepperoni";
        description = "Spicy pepperoni and mozzarella cheese";
        price = 1350;
        category = #meat;
        imageURL = "https://img.pizza.com/pepperoni.jpg";
      },
    );
    menuItems.add(
      "truffle-mushroom",
      {
        name = "Truffle Mushroom";
        description = "Truffle oil, mushrooms, mozzarella";
        price = 1600;
        category = #specialty;
        imageURL = "https://img.pizza.com/truffle-mushroom.jpg";
      },
    );
    menuItems.add(
      "bbq-chicken",
      {
        name = "BBQ Chicken";
        description = "BBQ sauce, chicken, red onions, cheese";
        price = 1500;
        category = #highlights;
        imageURL = "https://img.pizza.com/bbq-chicken.jpg";
      },
    );
  };

  initializeMenu();

  public query ({ caller }) func getMenu() : async [MenuItem] {
    menuItems.values().toArray();
  };

  public query ({ caller }) func findMenuItem(itemName : Text) : async ?MenuItem {
    menuItems.get(itemName);
  };

  public query ({ caller }) func getItemsByCategory(category : Category) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) {
        item.category == category;
      }
    );
  };

  public query ({ caller }) func getRestaurantInfo() : async Text {
    restaurantInfo;
  };
};
