<form action="{{route('send')}}" method="post">
    @csrf
    <input type="text" name="nome">
    <input type="text" name="email">

    <button type="submit">Enviar</button>
</form>