## Prerequisites
1. Set up the backend [https://github.com/AndrewKolosowski/prep-tracker-backend](https://github.com/AndrewKolosowski/prep-tracker-backend)

## Deploy Frontend
1. Get the backend URL
  ```bash
  gcloud run services describe prep-tracker-api \
    --region us-central1 \
    --format="value(status.url)"
  ```
2. Deploy Frontend
  ```bash
  gcloud run deploy prep-tracker-frontend \
    --source . \
    --region us-central1 \
    --no-allow-unauthenticated \
    --set-env-vars BACKEND_URL="<BACKEND URL>"
  ```

  3. Using the Google Cloud Console go to the Cloud Run -> prep-tracker-frontend -> Security -> Select Require Authentication -> Disable IAM & Enable IAP -> Edit Policy -> Add emails to give access to