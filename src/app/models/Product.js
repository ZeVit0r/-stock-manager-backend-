import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                purchase: Sequelize.FLOAT,
                sale: Sequelize.FLOAT,
                amount: Sequelize.INTEGER,
                category: Sequelize.STRING,
                provide: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }

}

export default Product;