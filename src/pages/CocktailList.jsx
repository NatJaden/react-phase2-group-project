import Cocktails from "../components/Cocktails";
import CreateCocktailForm from "../components/CreateCocktailForm";

function CocktailList() {
  return (
    <div>
      <CreateCocktailForm />
      <Cocktails />
    </div>
  );
}

export default CocktailList;
