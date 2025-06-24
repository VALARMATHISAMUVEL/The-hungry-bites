# react - project
/*Components
*Header - Logo, NavItems
*Body - Search, RestaurantContainer - RestaurantCart
*Footer - Copyright, Address, Links, Contact
*/


  const itemCardsList = resInfo?.cards
    ?.find((card) => card?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find(
      (c) => c?.card?.card?.itemCards
    )?.card?.card?.itemCards;