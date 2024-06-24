import { CategoryModel } from "@/database/models/Category";
import Logger from "@/lib/Logger";

const categories = [
  "Roman",
  "Bilim Kurgu",
  "Polisiye",
  "Korku",
  "Fantastik",
  "Tarih",
  "Kişisel Gelişim",
  "Felsefe",
  "Biyografi",
  "Psikoloji",
  "Din",
  "Edebiyat",
  "Çocuk Kitapları",
  "Dünya Klasikleri",
  "Aşk",
  "Drama",
  "Macera",
  "Gerilim",
  "Komedi",
  "Bilim",
  "Sosyoloji",
  "Mizah",
  "Manga",
  "Çizgi Roman",
  "Müzik",
  "Sanat",
  "Moda",
  "Spor",
  "Yemek",
  "Sağlık",
  "Teknoloji",
  "Bilgisayar",
  "Mühendislik",
  "Tasarım",
  "Yazılım",
  "Dil",
  "Eğitim",
  "Tarih",
  "Coğrafya",
  "Biyoloji",
  "Kimya",
  "Fizik",
  "Matematik",
  "Astronomi",
  "Uzay",
];

export default categories;

export const migrateCategories = async () => {
  await CategoryModel.deleteMany({});
  await CategoryModel.insertMany(
    categories.map((name) => ({ name, createdAt: Date.now() }))
  );
};
