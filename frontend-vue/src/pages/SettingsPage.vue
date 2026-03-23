<template>
  <div class="page">
    <h1>Settings</h1>
    <div style="max-width: 480px; display: flex; flex-direction: column; gap: 20px">
      <div>
        <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px">
          Restaurant Name
        </label>
        <input
          value="Delicious Burger"
          style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px"
        />
      </div>
      <div>
        <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px">
          Contact Email
        </label>
        <input
          value="admin@deliciousburger.com"
          style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px"
        />
      </div>
      <div>
        <label style="font-size: 13px; font-weight: 600; display: block; margin-bottom: 6px">
          Currency
        </label>
        <select
          value="IDR"
          style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px"
        >
          <option>IDR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
      <button
        style="align-self: flex-start; padding: 8px 24px; background: #4F46E5; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
