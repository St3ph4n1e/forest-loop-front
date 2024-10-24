<script setup lang="ts">

</script>

<template>
  <h1>FOREST LOOP - COMMENT JOUER</h1>
  <br/>
  <p>Lunk est coincé dans un cauchemar sans fin, parviendrez-vous à le libérer?</p>
  <br/>
  <h2>LE JEU</h2>
  <p>En tant que Guide, utilisez le guide forestier et les règles de la forêt pour indiquer le chemin au second joueur.
    Le livre de règles contient les règles de la forêt, chaque règle indique si un chemin peut être pris ou non.
    Le guide forestier contient les sprites et leurs variantes, il vous servira si vous avez un doute.</p>
  <br/>
  <h2>LES REGLES DE LA FORET</h2>
  <p>Attention : Les règles au dessus prennent priorité sur celles en dessous, et elles peuvent se contredire !
    Exemple : "Si x, aller à droite" et "Si x, ne pas aller à droite". Si la seconde règle est au dessus, la droite n'est pas ouverte, et vice-versa.
    Le joueur trouvera de temps en temps des carnets. Ces carnets indiquent que les règles ont changées (qu'il y en a une nouvelle, ou qu'une existante a été modifiée), ils sont donc très importants car ce sont les seuls moyens d'être à jour.</p>
  <br/>
  <h2>LE BUT</h2>
  <p>Pour s'échapper, le joueur doit passer un certain nombre de tuiles indiqué sur son écran.
    Se tromper de chemin équivaut à perdre toute sa progression, alors guidez-le bien.
    Attention toutefois, prenez trop votre temps et la forêt tentera de vous arrêter...</p>
</template>

<style src="./RuleContent.css" scoped></style>
