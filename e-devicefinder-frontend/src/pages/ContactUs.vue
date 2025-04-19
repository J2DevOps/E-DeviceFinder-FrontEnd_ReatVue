<template>
  <div class="contact-container">
    <h2>Contact Us</h2>
    <p class="contact-text">
      Got a question, feedback, or partnership inquiry? Reach out to our team — we're always happy to connect!
    </p>

    <ul class="contact-list">
      <li>
        <strong>Ndubuisi Augustine — Project Lead</strong><br />
        📧 Email: <a href="mailto:ndubuisi.augustine@example.com">ndubuisi.augustine@example.com</a><br />
        📞 Phone: +234 801 234 5678
      </li>
      <li>
        <strong>Ofoke Boniface — Project Manager & Backend Engineer</strong><br />
        📧 Email: <a href="mailto:ofoke.boniface@example.com">ofoke.boniface@example.com</a><br />
        📞 Phone: +234 802 345 6789
      </li>
      <li>
        <strong>Nnenne Mbam — Frontend Engineer</strong><br />
        📧 Email: <a href="mailto:nnenne.mbam@example.com">nnenne.mbam@example.com</a><br />
        📞 Phone: +234 803 456 7890
      </li>
      <li>
        <strong>Nwegede Helen — Frontend Engineer</strong><br />
        📧 Email: <a href="mailto:nwegede.helen@example.com">nwegede.helen@example.com</a><br />
        📞 Phone: +234 804 567 8901
      </li>
    </ul>
  </div>
</template>

<script setup>
// No script logic needed for now
</script>

<style scoped>
.contact-text {
  background-color: #444;
  padding: 1.5rem;
  border-radius: 10px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #fff;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-list li {
  background-color: #333;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  color: #ddd;
  border-left: 4px solid #ffcc00;
}

.contact-list a {
  color: #ffcc00;
  text-decoration: none;
}

.contact-list a:hover {
  text-decoration: underline;
}
</style>
