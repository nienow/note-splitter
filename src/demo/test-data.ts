import {DataVersion, EDITOR_GRID, EDITOR_SECTION} from '../constants';

export const WEEKLY_PLANNER = JSON.stringify({
  editor: EDITOR_GRID,
  version: DataVersion,
  columns: 3,
  title: true,
  sections: [
    {title: 'Monday', text: 'Call car insurance'},
    {title: 'Tuesday', text: '4pm Soccer Game'},
    {title: 'Wednesday', text: ''},
    {title: 'Thursday', text: 'Working Late\nGrocery Shopping?'},
    {title: 'Friday', text: 'Date night - remember to make reservations'},
    {title: 'Saturday', text: 'Morning hike?\nPick up Mary around 2pm'},
    {title: 'Sunday', text: 'Put up shelves in basement\nCleaning day'},
    {title: 'TODO', text: 'Pay estimated taxes\nLook for 2nd set of keys'},
    {title: 'Next Week', text: 'Car will be at shop Mon/Tues'}
  ]
});

export const SHOPPING_LIST = JSON.stringify({
  editor: EDITOR_SECTION,
  version: DataVersion,
  columns: 1,
  title: true,
  sections: [
    {title: 'Grocery Store', text: 'Milk\nEggs\nButter'},
    {title: 'Home Depot', text: 'Shelves for basement'},
    {title: 'Amazon', text: 'Dog food\nHeadphones'}
  ]
});

export const DAILY_GOALS = JSON.stringify({
  editor: EDITOR_GRID,
  version: DataVersion,
  columns: 2,
  title: true,
  sections: [
    {title: 'Work', text: 'Document the latest release process\nSetup meeting to go over latest feedback'},
    {title: 'Home', text: 'Workout right after work\nBake cookies for Jenny'},
    {title: 'Thankful For', text: 'Job has been low stress lately\n'},
    {title: 'Remember', text: 'Hazel has tryouts tomorrow'}
  ]
});

export const RECIPES = JSON.stringify({
  editor: EDITOR_SECTION,
  version: DataVersion,
  columns: 2,
  title: true,
  sections: [
    {
      title: 'Oatmeal Cookies', text: '1 cup of butter, 1 1/4 cups of  flour, 1 tsp baking soda, 3/4 cup of sugar (brown/white)\n' +
        '2 eggs, 2 cups of flaked coconut, 3 cups of quick oats, 1 cup raisins\n' +
        '350 for 8 minutes'
    },
    {
      title: 'Hummus', text: '15oz can chickpeas, 1/2 cup lemon juice, Blend\n' +
        '1 large garlic glove, 1/4 cup PB, 1 tsp cumin, Red pepper flakes\n'
    },
    {
      title: 'Donuts', text: '2 cups flour, ½ cup sugar, 1 tbsp baking powder, ¼ tsp cinnamon, \n' +
        '2 tbsp melted butter, ½ cup milk, 1 egg, beaten'
    },
    {
      title: 'Chocolate Cream Cheese Cookies',
      text: '1/2 choc baking bar, 1/2 cream cheese, 1 stick butter, 1/4 cup coconut oil, 1 egg, 1/2 cup sweet, 1/2 cup coconut, 1/2 cup coconut flour, 1 cup almond flour, 1tsp baking soda, 1/2 cup gelatin'
    }
  ]
});
