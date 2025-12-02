// src/pages/AddRecipe.jsx
import React, { useState } from "react";
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  Row, 
  Col,
  Alert,
  Spinner
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipeService";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initial form state matching your backend model
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
    cookingTime: "",
    difficulty: "",
    cuisine: "",
    dietaryType: "",
    servingSize: "",
    image: null
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.description || !formData.ingredients || !formData.category) {
      setError("Please fill in all required fields (*)");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("ingredients", formData.ingredients);
      data.append("steps", formData.steps);
      data.append("category", formData.category);
      data.append("cookingTime", formData.cookingTime);
      data.append("difficulty", formData.difficulty);
      data.append("cuisine", formData.cuisine);
      data.append("dietaryType", formData.dietaryType);
      data.append("servingSize", formData.servingSize);
      
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Send to backend
      const response = await createRecipe(data);
      
      setSuccess("Recipe created successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        ingredients: "",
        steps: "",
        category: "",
        cookingTime: "",
        difficulty: "",
        cuisine: "",
        dietaryType: "",
        servingSize: "",
        image: null
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/recipes");
      }, 2000);

    } catch (err) {
      console.error("Error creating recipe:", err);
      setError(err.response?.data?.error || "Failed to create recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-danger text-white">
              <h2 className="mb-0">🍳 Add New Recipe</h2>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Recipe Name */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Recipe Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter recipe name"
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* Category */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Category *</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your recipe..."
                    required
                  />
                </Form.Group>

                {/* Ingredients */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Ingredients *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    placeholder="Enter ingredients (one per line or comma-separated)"
                    required
                  />
                  <Form.Text className="text-muted">
                    Separate ingredients with commas or new lines
                  </Form.Text>
                </Form.Group>

                {/* Steps/Instructions */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Cooking Steps</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    placeholder="Step-by-step instructions..."
                  />
                </Form.Group>


                {/* Submit Button */}
                <div className="d-flex gap-3 justify-content-end">
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate("/recipes")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creating Recipe...
                      </>
                    ) : (
                      "Create Recipe"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;