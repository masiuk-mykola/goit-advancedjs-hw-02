# GoIT Advanced JS — Homework 02

A Vite-based project with two JavaScript tasks: a countdown timer and a
promise-based snackbar notification system.

**Live demo:**
[https://goitacademy.github.io/goit-advancedjs-hw-02/](https://goitacademy.github.io/goit-advancedjs-hw-02/)

## Tasks

### Task 1 — Countdown Timer (`src/1-timer.html`)

A timer that counts down to a user-selected date and time.

- Date/time picker powered by [flatpickr](https://flatpickr.js.org/)
- Validates that the selected date is in the future (shows an error toast
  otherwise)
- Start / Stop / Reset controls
- Displays remaining time broken down into days, hours, minutes, and seconds

### Task 2 — Promise Snackbar (`src/2-snackbar.html`)

A form that creates a promise with a configurable delay and state.

- User sets a delay in milliseconds and picks `fulfilled` or `rejected`
- After the delay, a toast notification appears via
  [iziToast](https://izitoast.marcelodolza.com/)
- Green toast for fulfilled, red toast for rejected
