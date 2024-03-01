@extends('Client.core.main')
@section('content')
    <h1>teste whi</h1>

    <section>

        @php
            $content = [
                'title' => 'porque confiar na',
                'highlight' => 'whi',
                'image' => asset('Client/assets/images/cat-sqr.jpg'),
                'text' => 'Confie na gente para transformar sua marca em uma experiência digital incrível. Nossa agência une criatividade, tecnologia e compromisso para construir sua presença online de forma inovadora e impactante.',
            ];
        @endphp

        @for ($i = 0; $i < 3; $i++)
            @include('Client.models.mdl-article', $content)
        @endfor

    </section>
@endsection
