<template>
  <div>
    <div class="section">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1608369080189-607631901374?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80"
          alt="Beach and waterfront"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">Who we are</div>
        <h2 class="type--heading-1">About Us</h2>
        <div class="type--body">
          Known at the turn of the century as ‘Kep Sur Mer’ – an exclusive
          seaside getaway for the colonial French elite – in the 1950s, during
          the Golden Age of Cambodia, Kep was a popular holiday and residential
          destination for wealthy Khmers. The Overlook structures are the
          creations of the movement led by iconic Cambodian architect Van
          Molyvan, a protege of the famous Le Corbusier (French architect). Our
          iconic Blue Villa once belonged to the governor of Kep; the entrance
          and reception building was owned by a relative of the King; and the
          red summer house was owned by the Head of Customs. Francoise Lavielle,
          a French architect living in Phnom Penh, has taken the lead in
          restoring the villas to their original architectural grandeur.
        </div>
      </div>
    </div>

    <div class="section section--reversed">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1433155805822-ffc337821a5b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Overlook One Dining Room"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">Subtle</div>
        <h2 class="type--heading-1">Symbolism</h2>
        <div class="type--body">
          In Khmer, Overlook means a rainbow encircling the sun. In Buddhism,
          this rainbow is the halo around Buddha’s head. Keeping this symbolism
          in mind, Overlook was developed as an exclusive retreat to protect and
          shelter its visitors and offer them a home away from home.
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80"
          alt="Overlook Hotels Receptionist Office"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">Attention To</div>
        <h2 class="type--heading-1">Authencity</h2>
        <div class="type--body">
          With a connection to our region, our unique barefoot luxury concept
          encapsulates the history and culture of Kep. Elegant lines, natural
          materials, and subtle earthy hues combine perfectly to create a sense
          of continuity with the surrounding gardens, swaying palm trees, and
          open views of the sea. Our spacious rooms have all been tastefully
          furnished with local antiques and artefacts that reflect modern Khmer
          design and architecture.
        </div>
      </div>
    </div>

    <div class="section section--reversed">
      <div class="section__image">
        <img
          class="ovl-image--cover"
          src="https://images.unsplash.com/photo-1533633310920-cc9bf1e7f9b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Grand Overlook's King's Court Room"
        />
      </div>
      <div class="section__info">
        <div class="type--preheader">An Invitation To</div>
        <h2 class="type--heading-1">Reflect</h2>
        <div class="type--body">
          A driving force behind the clean lines and minimalist style of
          Overlook is adopted from the ancient Japanese philosophy of Wabi Sabi,
          which places importance on simplicity & understated elegance. Overlook
          was developed as an exclusive retreat to protect and shelter its
          visitors and offer them a home away from home, with a signature blend
          of privacy and personalized service. A driving force behind Overlook
          is to provide you with private time on your own. We have taken care to
          create spaces specially made for reflection and rejuvenation.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-lg);
}

.section__info {
  padding: var(--spacing-md);
}

/** Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/** Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .section {
    flex-direction: row;
    margin-bottom: var(--spacing-xl);
  }

  .section--reversed {
    flex-direction: row-reverse;
  }

  .section__image {
    width: 60%;
  }

  .section__info {
    width: 40%;
    padding: var(--spacing-lg);
  }

  .section--reversed > .section__info {
    padding-left: 0;
  }
}
/** Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/** Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
