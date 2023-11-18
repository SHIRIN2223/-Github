import React, { useState } from "react";
import BookCard from "./components/BookCard";
import { ADD_TYPE } from "./components/ButtonTypes";
import { Toast, toast } from "react-toastify";
import CustomButton from './components/CustomButton'


const App = () => {

  const [bookName, setBookName] = useState("");
  //Tüm Kitapların Tutulduğu Dizi

  const [bookList, setBookList] = useState([]);
  // console.log(inputText)

  //console.log(new Date().toLocaleString())

  //Kitab ekleme işlemi
  const addBook = (e) => {
    e.preventDefault();
    //console.log('fonksiyon çalıştı')

    //Yeni Kitab bilgilerini tutan bir obje oluşturulması
    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //spread operator (...)

    setBookList([...bookList, newBook]);

    //Ekle butonuna basıldığında inputu temizliyor

    setBookName("");
  };
    //*bildirim verme
   
  

    
  //Sil Butonuna basılınca çalışacak fonksiyon

  const handleDelete = (deleteId) => {
    //kitap listesi filter metodu ile dönülür ve istenilen değer eşit olmayan elemenalar yeni değişkene atanır
    const filteredList = bookList.filter((book) => book.id !== deleteId);

    //Kitap Listesi bu yeni değişken ile güncellenir
    setBookList(filteredList);

    toast.error("Kitap silindi!!")
  };

 //okundu butonuna basılınca
 //1- okundu değerini terisne çevir
 //2- bookList dizisini kopyasını olutşru
 //3-dünelenecek olan dizi elemanını indexini tespit etme
 //4-eski kitapı diziden çıkartıyoruz ve yerine yeni kitabı eklıyoruz
 // 5-Güncel Kopya diziyi stateye aktarıoyruz

 const handleReadChange=(book)=>{

    //İstenilen Kitapda okundu bilgisi değiştirme
const updatedBook={...book,isRead: !book.isRead}





//dizideki değişmemiş eski elemanı tespit adımları

const cloneBookList = [...bookList]


const bookIndex = cloneBookList.findIndex((item) => item.id===book.id)


cloneBookList.splice(bookIndex,1,updatedBook)

setBookList(cloneBookList)


 }
   // Kitabı düzenler
   const handleEdit = (book, newTitle) => {
    const updated = { ...book, bookTitle: newTitle };

    /*
    dizi içerisine yeni dizi oluşturup güncwllwnicek olan elemanı dahit etmeyip
    eski elemanlar + güncel versiyon' u dahil et 
    */

    const newList = bookList.map((book) =>
      book.id !== updated.id ? book : updated
    );

    //* State'i güncelleme
    setBookList(newList);

    //* bildirim verme
    
  };

  return (
    <div>
      <header className="bg-dark text-light  py-2 text-center fs-5  ">
        Kitap Kurdu
      </header>

      <div className="container border pb-5">
        {/*Kitap Ekleme Formu*/}
        <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Kitap Adı Giriniz"
            className="form-control shadow" type="text"
          />
          <CustomButton= "btn btn-warning shadow" type={ADD_TYPE} title={"Ekle"} />
        </form>
        {/*Kitap Ekleme Formu*/}

        {/*Kitapları gösteren Yapı*/}
        <div className="d-flex flex-column gap-5 mt-3">
          {bookList.length === 0 ? (
            <p className="text-white">Henüz herhangi bir kitap eklenmedi</p>
          ) : (
            bookList.map((book) => {
              return (
                <BookCard
                readUpdateClick={()=>handleReadChange(book)}
                  deleteClick={() => handleDelete(book.id)}
                  handleEdit={handleEdit}
                  bookInfo={book}
                />
              );
            })
          )}
        </div>

      </div>
    </div>
  );
          };
export default App;



































































































