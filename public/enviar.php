<?php
// Envio do formulário de contacto (cPanel/PHP). Destino: info@fjc.org.mz
header('Content-Type: application/json; charset=utf-8');
$to = 'info@fjc.org.mz';
$fail = function ($code) { http_response_code($code); echo json_encode(['ok' => false]); exit; };

if ($_SERVER['REQUEST_METHOD'] !== 'POST') $fail(405);
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; } // honeypot anti-spam

$clean = function ($v, $max) { return mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string)$v)), 0, $max); };
$nome = $clean($_POST['nome'] ?? '', 100);
$email = $clean($_POST['email'] ?? '', 120);
$assunto = $clean($_POST['assunto'] ?? '', 150);
$mensagem = mb_substr(trim((string)($_POST['mensagem'] ?? '')), 0, 4000);

if ($nome === '' || $assunto === '' || $mensagem === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $fail(422);

$headers = [
  'From: Website FJC <no-reply@fjc.org.mz>',
  'Reply-To: ' . $email,
  'Content-Type: text/plain; charset=UTF-8',
];
$body = "Nome: $nome\nEmail: $email\n\n$mensagem\n";
$ok = mail($to, '=?UTF-8?B?' . base64_encode('[Website] ' . $assunto) . '?=', $body, implode("\r\n", $headers));
if (!$ok) $fail(500);
echo json_encode(['ok' => true]);
