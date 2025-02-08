import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import libraryImage from './assets/library.jpg'; // Adjust the path to your image

const App = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setUsers(storedUsers);
    setBooks(storedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const newUser = { firstName, lastName, phoneNumber, email, password, books: [] };
    setUsers([...users, newUser]);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage("Thank you for signing up! Please sign in.");
    setIsSignUp(false); // Switch to sign-in form after successful sign-up
  };

  const handleSignIn = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setEmail("");
      setPassword("");
      setMessage("");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleAddBook = () => {
    if (bookTitle.trim() === "") return;
    const newBook = { title: bookTitle, author, userEmail: currentUser.email, timeAdded: new Date().toLocaleString() };
    setBooks([...books, newBook]);
    setBookTitle("");
    setAuthor("");
  };

  const handleRemoveBook = (book) => {
    const updatedBooks = books.filter((b) => b.title !== book.title);
    setBooks(updatedBooks);
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${libraryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          margin: "auto",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        {!currentUser ? (
          <Box>
            <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20px", color: "#1976d2" }}>
              Welcome to Library Management
            </Typography>

            {isSignUp ? (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: "20px", color: "#333" }}>
                  Sign Up
                </Typography>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1976d2", color: "#fff", marginBottom: "20px" }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>

                {message && (
                  <Typography sx={{ color: "#4caf50", fontWeight: "bold" }}>
                    {message}
                  </Typography>
                )}

                <Typography sx={{ marginTop: "10px" }}>
                  Already have an account?{" "}
                  <Button
                    variant="text"
                    sx={{ color: "#1976d2" }}
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </Button>
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h4" sx={{ marginBottom: "20px", color: "#333" }}>
                  Sign In
                </Typography>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#1976d2", color: "#fff", marginBottom: "20px" }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>

                {message && (
                  <Typography sx={{ color: "#f44336", fontWeight: "bold" }}>
                    {message}
                  </Typography>
                )}

                <Typography sx={{ marginTop: "10px" }}>
                  Don't have an account?{" "}
                  <Button
                    variant="text"
                    sx={{ color: "#1976d2" }}
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Typography variant="h4" sx={{ marginBottom: "20px", color: "#333" }}>
              My Books
            </Typography>
            <TextField
              label="Book Title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Author (Optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              sx={{ marginBottom: "20px" }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1976d2", color: "#fff", marginBottom: "20px" }}
              onClick={handleAddBook}
              startIcon={<AddIcon />}
            >
              Add Book
            </Button>

            <List>
              {books
                .filter((book) => book.userEmail === currentUser.email)
                .map((book, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={book.title}
                      secondary={`Author: ${book.author}, Added at: ${book.timeAdded}`}
                    />
                    <Button
                      variant="outlined"
                      sx={{ color: "#f44336", borderColor: "#f44336" }}
                      onClick={() => handleRemoveBook(book)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))}
            </List>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#f44336", color: "#fff" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default App;