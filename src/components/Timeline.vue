<template>
  <nav id="timeline-nav">
    <div class="nav-inner">
      <div class="nav-brand">
        <router-link to="/">
          <span class="brand-symbol">✦</span>
          <span class="brand-text">Griekse Goden</span>
        </router-link>
      </div>

      <ul class="nav-links">
        <li>
          <router-link to="/schepping" class="nav-link">
            <span class="nav-numeral">I</span>
            <span class="nav-label">De Schepping</span>
          </router-link>
        </li>
        <li>
          <router-link to="/godentijd" class="nav-link">
            <span class="nav-numeral">II</span>
            <span class="nav-label">De Goden Tijd</span>
          </router-link>
        </li>
        <li>
          <router-link to="/heldentijd" class="nav-link">
            <span class="nav-numeral">III</span>
            <span class="nav-label">De Helden Tijd</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <div class="nav-spacer"></div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');

#timeline-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 8, 4, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201, 168, 76, 0.18);
}

.nav-spacer {
  height: 48px;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
}

.brand-symbol {
  font-size: 0.7rem;
  color: #c9a84c;
}

.brand-text {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c9a84c;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.nav-brand a:hover .brand-text {
  opacity: 1;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1rem;
}

.nav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0.75rem;
  height: 48px;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  transition: background 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: #c9a84c;
  transform: scaleX(0);
  transition: transform 0.2s ease;
  transform-origin: center;
}

.nav-link:hover {
  background: rgba(201, 168, 76, 0.07);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link.router-link-active {
  background: rgba(201, 168, 76, 0.1);
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-link.router-link-active .nav-numeral,
.nav-link.router-link-active .nav-label {
  color: #f0d98a;
  opacity: 1;
}

.nav-numeral {
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  font-weight: 600;
  color: #c9a84c;
  opacity: 0.5;
  letter-spacing: 0.05em;
  transition: opacity 0.2s;
}

.nav-label {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #d4bc7a;
  opacity: 0.75;
  transition: color 0.2s, opacity 0.2s;
}

.nav-link:hover .nav-numeral,
.nav-link:hover .nav-label {
  opacity: 1;
}

@media (max-width: 600px) {
  .nav-inner {
    padding: 0 1rem;
  }

  .nav-numeral {
    display: none;
  }

  .nav-label {
    font-size: 0.65rem;
    letter-spacing: 0.05em;
  }

  .brand-text {
    display: none;
  }
}
</style>