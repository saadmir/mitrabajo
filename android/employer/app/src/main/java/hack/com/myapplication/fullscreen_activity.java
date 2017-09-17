package hack.com.myapplication;
import com.mapbox.mapboxsdk.annotations.Marker;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.geometry.LatLng;
import android.app.Activity;
import android.content.Intent;
import android.media.Image;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.mapquest.mapping.MapQuestAccountManager;
import com.mapquest.mapping.maps.OnMapReadyCallback;
import com.mapquest.mapping.maps.MapboxMap;
import com.mapquest.mapping.maps.MapView;

import static android.R.attr.x;
import static hack.com.myapplication.R.id.textView2;

public class fullscreen_activity extends Activity {
    //private final LatLng SAN_FRAN = new LatLng(37.77564, -122.38674);
    private final LatLng Pier39 = new LatLng(37.80867, -122.40982);
    private final LatLng Civic_Center = new LatLng(37.78155, -122.41564);
    private final LatLng Bernal_Heights = new LatLng(37.74116, -122.41784);
    private MapboxMap mMapboxMap;
    private MapView mMapView;
    private ImageView employee;
    private TextView responseTime;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MapQuestAccountManager.start(getApplicationContext());

        setContentView(R.layout.activity_fullscreen);

      //  ListView listView = (ListView) this.findViewById(R.id.deviceList);
        employee = (ImageView) findViewById(R.id.imageView3);
        responseTime = (TextView) findViewById(textView2);

        mMapView = (MapView) findViewById(R.id.mapquestMapView);
        mMapView.onCreate(savedInstanceState);

        mMapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(MapboxMap mapboxMap) {
                mMapboxMap = mapboxMap;
              //  mMapboxMap.moveCamera(CameraUpdateFactory.newLatLngZoom(SAN_FRAN, 11));
              //  addMarker(mMapboxMap, SAN_FRAN, "Hani", "Automotive Professional" );
                mMapboxMap.moveCamera(CameraUpdateFactory.newLatLngZoom(Pier39, 11));
                addMarker(mMapboxMap, Pier39, "Anum", "Finance Professional");
                mMapboxMap.moveCamera(CameraUpdateFactory.newLatLngZoom(Civic_Center, 11));
                addMarker(mMapboxMap, Civic_Center, "Jawad", "IC Designer");
                mMapboxMap.moveCamera(CameraUpdateFactory.newLatLngZoom(Bernal_Heights, 11));
                addMarker(mMapboxMap, Bernal_Heights, "Saad", "Front End Guru");
            }
        });
    }



    private void addMarker(MapboxMap mapboxMap, LatLng location, final String title, final String description ) {
        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(location);
        markerOptions.title(title);
        markerOptions.snippet(description);
        mapboxMap.addMarker(markerOptions);
        mMapboxMap.setOnMarkerClickListener(new MapboxMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(@NonNull Marker marker) {

                if (marker.getTitle().equals("Anum"))
                {
                  //  marker.showInfoWindow(mMapboxMap, mMapView);
                    employee.setImageResource(R.drawable.anum);
                    responseTime.setText("30 minutes");

                }
                else if (marker.getTitle().equals("Jawad"))
                {
                  //  marker.showInfoWindow(mMapboxMap, mMapView);
                    employee.setImageResource(R.drawable.jawad);
                    responseTime.setText("4 hours");

                }
                else if (marker.getTitle().equals("Saad"))
                {
                   // marker.showInfoWindow(mMapboxMap, mMapView);
                    employee.setImageResource(R.drawable.ssaad);
                    responseTime.setText("50 minutes");

                }
                return true;

            }
        });
    }

    @Override
    public void onResume()
    { super.onResume(); mMapView.onResume(); }

    @Override
    public void onPause()
    { super.onPause(); mMapView.onPause(); }

    @Override
    protected void onDestroy()
    { super.onDestroy(); mMapView.onDestroy(); }

    @Override
    protected void onSaveInstanceState(Bundle outState)
    { super.onSaveInstanceState(outState); mMapView.onSaveInstanceState(outState); }

    public void Message(View view)
    {
        String telephone = null;

        if (responseTime.getText().equals("30 minutes"))
        {
            telephone = "18186480121";
        }
        else if (responseTime.getText().equals("4 hours"))
        {
            telephone = "16503878873";
        }
        else if (responseTime.getText().equals("50 minutes"))
        {
            telephone = "14153356477";
        }
        Intent sendIntent = new Intent(Intent.ACTION_VIEW);
        sendIntent.setData(Uri.parse("sms:"));
        sendIntent.putExtra("address", telephone);
        sendIntent.putExtra("sms_body", x);
        startActivity(sendIntent);

    }


    public void AvailableNow(View view)
    {
        Toast.makeText(getApplicationContext(),"Hello Javatpoint",Toast.LENGTH_SHORT).show();

    }

    public void FutureWork(View view)
    {

    }

    public void updateEmployee()
    {


    }
}