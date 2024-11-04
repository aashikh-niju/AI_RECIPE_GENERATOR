function displayRecipe(response) {
    new Typewriter("#recipe", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
    });
}

function generateRecipe(event) {
    event.preventDefault();
  
    let instructionInput = document.querySelector("#user-instructions").value;
    
    // Get all selected spices (this creates an array of selected spice values)
    let selectedSpices = Array.from(document.querySelectorAll("#spices option:checked"))
                               .map(option => option.value)
                               .join(", "); // Join selected spices into a string separated by commas
  
    let selectedServingSize = document.querySelector("#serving-size").value;
    let recipeElement = document.querySelector("#recipe");
    let errorMessage = document.querySelector("#error-message");
  
    // Check if serving size is selected (spices are optional)
    if (!selectedServingSize) {
      errorMessage.classList.remove("hidden");
      return;
    } else {
      errorMessage.classList.add("hidden");
    }
  
    let apiKey = "ca80fb7d3o48t3c14460b13a3d83ca48";
    let prompt = `User instructions: Generate a recipe for ${instructionInput}, using ${selectedSpices ? selectedSpices : "no specific spices"}, with a serving size of ${selectedServingSize}.`;
    let context =
      "You are a renowned chef who knows all the recipes around the world. Follow the user instructions clearly to generate a recipe. First, write the 'title' of the recipe inside a <h2> element. Secondly, summarize the 'cooking duration' and 'serving size' inside a standard <p> element. Thirdly, begin with the 'Ingredients' header inside a <h3> element, list the required ingredients in bullet point symbol, and separate each line item with a <br/>. Next, begin with the 'Instructions' header inside a <h3> element, list the recipe step-by-step in numbered list format, and separate each step with a <br/>. Lastly, sign off the recipe with 'The Connoisseur AI Recipe' inside an <em> element at the end of the recipe after a <br/>.";
  
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  
    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="blink"> 👨🏻‍🍳 Generating a recipe for ${instructionInput} with ${selectedSpices ? selectedSpices : "no spices"} for ${selectedServingSize} servings...</div>`;
  
    axios.get(apiUrl).then(displayRecipe);
}

let recipeForm = document.querySelector("#recipe-form");
recipeForm.addEventListener("submit", generateRecipe);
