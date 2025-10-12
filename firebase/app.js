// app.js
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const message = document.getElementById("message");
const userTableBody = document.getElementById("userTableBody");

let editId = null;

// Display message for few seconds
function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  setTimeout(() => (message.textContent = ""), 2500);
}

// Save / Update user
saveBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !email || !address) {
    showMessage("⚠️ Please fill all fields.", "red");
    return;
  }

  try {
    if (editId) {
      await updateDoc(doc(db, "users", editId), { name, email, address });
      showMessage("✅ User updated successfully!", "green");
      editId = null;
      saveBtn.textContent = "Save User";
    } else {
      await addDoc(collection(db, "users"), {
        name,
        email,
        address,
        createdAt: serverTimestamp(),
      });
      showMessage("✅ User added successfully!", "green");
    }

    nameInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
  } catch (error) {
    console.error(error);
    showMessage("❌ Error saving data!", "red");
  }
});

// Real-time updates
onSnapshot(collection(db, "users"), (snapshot) => {
  userTableBody.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const user = docSnap.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.address}</td>
      <td style="text-align:center;">
        <button class="btn edit-btn" data-id="${docSnap.id}">Edit</button>
        <button class="btn delete-btn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;
    userTableBody.appendChild(tr);
  });
  attachActions();
});

// Handle edit/delete
function attachActions() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      nameInput.value = row.children[0].textContent;
      emailInput.value = row.children[1].textContent;
      addressInput.value = row.children[2].textContent;
      editId = e.target.dataset.id;
      saveBtn.textContent = "Update User";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const confirmDelete = confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        await deleteDoc(doc(db, "users", id));
        showMessage("🗑 User deleted successfully!", "red");
      }
    });
  });
}
