# Mikaila Brown — V13 One-Page Portfolio

All website content is on `/`, with anchor navigation for Services, Work, About, Credentials, and Contact. The five projects are showcased inline; three link to their public GitHub repositories and two direct visitors to the inquiry form.

## Run

```bash
npm install
npm run dev
```

## Contact form (SplitForms)

Create a form at splitforms.com and copy its access key into `.env.local`:

```env
SPLITFORMS_ACCESS_KEY=your_access_key
```

The contact form posts to `/api/contact`, which forwards to SplitForms server-side so the key stays off the client. Add the same variable to your deployment environment (e.g. Netlify) and redeploy. Verify delivery with a test submission before publishing.

## Notes

The project illustrations are conceptual mockups. Animations honor reduced-motion settings.
