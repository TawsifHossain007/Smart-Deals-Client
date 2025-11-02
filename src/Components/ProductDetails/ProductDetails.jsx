import React, { use, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const [bids,setBids] = useState([])
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);
  console.log(id);


  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  useEffect(()=>{
    fetch(`http://localhost:3100/products/bids/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log('bids for this product',data)
        setBids(data)
    })
  },[id])

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const name = form.name.value;
    const bid = form.bid.value;

    const newBid = {
      product: id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3100/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });

          newBid._id = data.insertedId
          const newBids = [...bids,newBid]
          newBids.sort((a,b)=>a.bid_price - b.bid_price)
          setBids(newBids)
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      {/* product info */}
      <div>
        <div className="flex items-center justify-center pt-20">
          <button onClick={handleBidModalOpen} className="btn btn-primary">
            I want to Buy this product
          </button>

          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give the best offer!</h3>
              <p className="py-4">
                Offer something that the seller can't resist
              </p>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    readOnly
                    defaultValue={user?.email}
                  />
                  <label className="label">Bid Amount</label>
                  <input
                    name="bid"
                    type="text"
                    className="input"
                    placeholder="Your Bid"
                  />
                  <button className="btn btn-primary mt-4">Place Bid</button>
                </fieldset>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>


      {/* bids for this product */}
       <div>
        <h1 className="text-3xl text-primary text-center pt-10">Bids for this product: {bids.length}</h1>
        <div className="overflow-x-auto pt-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        SL No.
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
            bids.map((bid,index) =><tr>
        <th>
            {index+1}  
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>

        <td>
         {bid.buyer_email}
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>

        <td>{bid.bid_price}</td>
        
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>)
        }
      {/* row 2 */}

    </tbody>
  </table>
</div>
       </div>
    </div>
  );
};

export default ProductDetails;
