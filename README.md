## Prerequisites
1. Set up the backend [https://github.com/AndrewKolosowski/prep-tracker-backend](https://github.com/AndrewKolosowski/prep-tracker-backend)

## Deploy Frontend
1. Get the backend URL
  ```bash
  gcloud run services describe prep-tracker-api \
    --region us-central1 \
    --format="value(status.url)"
  ```

2. Deploy Cloud Run Function
  ```bash
  gcloud run deploy prep-tracker-frontend \
    --source . \
    --region us-central1 \
    --no-allow-unauthenticated \
    --set-env-vars BACKEND_URL="<BACKEND URL>"
  ```

3. Get frontend Service Account Email
```bash
  gcloud run services describe prep-tracker-frontend \
    --region us-central1 \
    --format="value(spec.template.spec.serviceAccountName)"
  ```
4. Give Frontend Service Account Cloud Invoker for Backend 
```bash
  gcloud run services add-iam-policy-binding prep-tracker-api \
    --region us-central1 \
    --member="<SERVICE ACCOUNT EMAIL>" \
    --role="roles/run.invoker"
```
5. Give users Cloud Invoker for Frontend
```bash
  gcloud run services add-iam-policy-binding prep-tracker-frontend \
    --region us-central1 \
    --member="<PERSONAL_EMAIL>" \
    --role="roles/run.invoker"
```

6. Using the Google Cloud Console go to the Cloud Run -> prep-tracker-frontend -> Security -> Select Require Authentication -> Disable IAM & Enable IAP -> Edit Policy -> Add personal user emails

7. Visit Cloud Function URL
```bash
  gcloud run services describe prep-tracker-frontend \
    --region us-central1 \
    --format="value(status.url)"
```