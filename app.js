    document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
            items:[
                {id: 2, name:'Coconut Water', img:'2.jpg', price: 30000},
                {id: 3, name:'Kombucha', img:'3.jpg', price: 50000},
                {id: 4, name:'Lemonade', img:'4.jpg', price: 40000},
                {id: 5, name:'Smoothie', img:'4.jpg', price: 60000},
                {id: 6, name:'Matcha', img:'6.jpg', price: 60000},
                {id: 7, name:'Pressed Juice', img:'7.jpg', price: 50000},
            ]}),
            
    Alpine.store('cart', {
      items:[],
      total:0,
      quantity:0,
      add(newItem){
        //cek apakah ada barang yang sama di cart
        const cartItem = this.items.find((item)=>item.id === newItem.id);

        //jika belum ada/cart masih kosong
        if(!cartItem){
            this.items.push({...newItem, quantity:1, total:newItem.price });
            this.quantity++; //itung quantity keseluruhan barang di cart
            this.total += newItem.price;
            console.log(this.total);
        } else{
            //jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
            this.items = this.items.map((item) => {
                //jika barang berbeda
                if(item.id !== newItem.id){
                    return item;
                } else {
                    //jika barang sudah ada, tambah quantity dan sub total
                    item.quantity++;
                    item.total = item.price * item.quantity; //hitung quantity sebuah item
                    this.quantity++;

                    this.total += item.price;
                    return item;
                }
            });
        }

    },
    remove(id){
        //ambil item yang mau di remove berdasarkan idnya
        const cartItem = this.items.find((item)=>item.id === id);

        //jika item lebih dari 1
        if(cartItem.quantity > 1){
            //telusuri 1 1
            this.items = this.items.map((item) => {
                //jika bukan barang yang dikluk
                if(item.id !== id){
                    return item;
                } else{
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else if(cartItem.quantity == 1){
            //jika barang sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    },
}));
});
