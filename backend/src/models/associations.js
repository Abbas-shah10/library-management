import Book from "./books.model.js";
import Author from "./author.model.js";
import Category from "./category.model.js";
import BookAuthor from "./bookauthor.model.js";
import Member from "./member.model.js";
import Loan from "./loan.model.js";
import Fine from "./fine.model.js";
import Reservation from "./reservation.model.js";
import User from './user.model.js'
import RefreshToken from './refreshToken.model.js'

User.belongsTo(Member, { foreignKey: "member_id" });

User.hasMany(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });
Member.hasOne(User, { foreignKey: "member_id" });

Category.hasMany(Book, { foreignKey: "category_id" });
Book.belongsTo(Category, { foreignKey: "category_id" });

Book.belongsToMany(Author, { through: BookAuthor, foreignKey: "book_id" });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: "author_id" });

Member.hasMany(Loan, { foreignKey: "member_id" });
Loan.belongsTo(Member, { foreignKey: "member_id" });

Book.hasMany(Loan, { foreignKey: "book_id" });
Loan.belongsTo(Book, { foreignKey: "book_id" });

Loan.hasMany(Fine, { foreignKey: "loan_id" });
Fine.belongsTo(Loan, { foreignKey: "loan_id" });

Member.hasMany(Reservation, { foreignKey: "member_id" });
Reservation.belongsTo(Member, { foreignKey: "member_id" });

Book.hasMany(Reservation, { foreignKey: "book_id" });
Reservation.belongsTo(Book, { foreignKey: "book_id" });

export { Book, Author, Category, BookAuthor, Member, Loan, Fine, Reservation, User, RefreshToken };